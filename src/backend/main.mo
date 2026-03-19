import Map "mo:core/Map";
import Nat "mo:core/Nat";
import Array "mo:core/Array";
import Text "mo:core/Text";
import Iter "mo:core/Iter";
import Runtime "mo:core/Runtime";
import Principal "mo:core/Principal";

import Stripe "stripe/stripe";
import OutCall "http-outcalls/outcall";
import MixinAuthorization "authorization/MixinAuthorization";
import AccessControl "authorization/access-control";


actor {
  let accessControlState = AccessControl.initState();
  include MixinAuthorization(accessControlState);

  // Product type definition
  public type Product = {
    id : Text;
    name : Text;
    description : Text;
    price : Text;
    notes : Text;
    category : Text;
    imageUrl : Text;
  };

  let products = Map.empty<Text, Product>();

  // Pre-populate products
  let roseLumiere : Product = {
    id = "1";
    name = "Rose Lumiere";
    description = "A bright and elegant floral scent with notes of rose, jasmine, and musk.";
    price = "$185";
    notes = "Rose, Jasmine, Musk";
    category = "Floral";
    imageUrl = "rose_lumiere.jpg";
  };

  let velvetBlanc : Product = {
    id = "2";
    name = "Velvet Blanc";
    description = "A soft, powdery fragrance featuring white flowers and vanilla undertones.";
    price = "$200";
    notes = "White Flowers, Vanilla, Musk";
    category = "Oriental";
    imageUrl = "velvet_blanc.jpg";
  };

  let orDore : Product = {
    id = "3";
    name = "Or Dore";
    description = "A luxurious blend of amber, sandalwood, and spices.";
    price = "$220";
    notes = "Amber, Sandalwood, Spices";
    category = "Woody";
    imageUrl = "or_dore.jpg";
  };

  let jasminPur : Product = {
    id = "4";
    name = "Jasmin Pur";
    description = "A fresh and vibrant jasmine scent with hints of citrus.";
    price = "$180";
    notes = "Jasmine, Citrus, Musk";
    category = "Floral";
    imageUrl = "jasmin_pur.jpg";
  };

  let nuitBlanche : Product = {
    id = "5";
    name = "Nuit Blanche";
    description = "A mysterious and deep fragrance with oud and patchouli.";
    price = "$210";
    notes = "Oud, Patchouli, Leather";
    category = "Oriental";
    imageUrl = "nuit_blanche.jpg";
  };

  let satinRose : Product = {
    id = "6";
    name = "Satin Rose";
    description = "A romantic blend of roses and soft spices with a hint of vanilla.";
    price = "$195";
    notes = "Rose, Spices, Vanilla";
    category = "Floral";
    imageUrl = "satin_rose.jpg";
  };

  // Product initialization
  products.add(roseLumiere.id, roseLumiere);
  products.add(velvetBlanc.id, velvetBlanc);
  products.add(orDore.id, orDore);
  products.add(jasminPur.id, jasminPur);
  products.add(nuitBlanche.id, nuitBlanche);
  products.add(satinRose.id, satinRose);

  public query ({ caller }) func getAllProducts() : async [Product] {
    products.values().toArray();
  };

  public query ({ caller }) func getProductById(id : Text) : async Product {
    switch (products.get(id)) {
      case (null) { Runtime.trap("Product with id " # id # " does not exist") };
      case (?product) { product };
    };
  };

  // Stripe integration
  var configuration : ?Stripe.StripeConfiguration = null;

  // Track session ownership for authorization
  let sessionOwners = Map.empty<Text, Principal>();

  public query func isStripeConfigured() : async Bool {
    configuration != null;
  };

  public shared ({ caller }) func setStripeConfiguration(config : Stripe.StripeConfiguration) : async () {
    if (not (AccessControl.hasPermission(accessControlState, caller, #admin))) {
      Runtime.trap("Unauthorized: Only admins can perform this action");
    };
    configuration := ?config;
  };

  func getStripeConfiguration() : Stripe.StripeConfiguration {
    switch (configuration) {
      case (null) { Runtime.trap("Stripe needs to be first configured") };
      case (?value) { value };
    };
  };

  public shared ({ caller }) func getStripeSessionStatus(sessionId : Text) : async Stripe.StripeSessionStatus {
    // Verify ownership: only the user who created the session or admin can check it
    switch (sessionOwners.get(sessionId)) {
      case (null) { Runtime.trap("Session not found") };
      case (?owner) {
        if (caller != owner and not AccessControl.isAdmin(accessControlState, caller)) {
          Runtime.trap("Unauthorized: Can only check your own session status");
        };
      };
    };
    await Stripe.getSessionStatus(getStripeConfiguration(), sessionId, transform);
  };

  public shared ({ caller }) func createCheckoutSession(items : [Stripe.ShoppingItem], successUrl : Text, cancelUrl : Text) : async Text {
    if (not (AccessControl.hasPermission(accessControlState, caller, #user))) {
      Runtime.trap("Unauthorized: Only users can create checkout sessions");
    };
    let sessionId = await Stripe.createCheckoutSession(getStripeConfiguration(), caller, items, successUrl, cancelUrl, transform);
    // Track session ownership
    sessionOwners.add(sessionId, caller);
    sessionId;
  };

  public query func transform(input : OutCall.TransformationInput) : async OutCall.TransformationOutput {
    OutCall.transform(input);
  };

  // Ratings system
  public type Rating = {
    rating : Nat;
    review : Text;
  };

  let ratings = Map.empty<Text, [Rating]>();

  private func assertRatingValid(rating : Nat) {
    if (rating < 1 or rating > 5) {
      Runtime.trap("Rating must be between 1 and 5");
    };
  };

  public shared ({ caller }) func rateProduct(productId : Text, rating : Nat, review : Text) : async () {
    if (not (AccessControl.hasPermission(accessControlState, caller, #user))) {
      Runtime.trap("Unauthorized: Only users can submit ratings");
    };

    assertRatingValid(rating);

    // Validate product exists
    switch (products.get(productId)) {
      case (null) { Runtime.trap("Product with id " # productId # " does not exist") };
      case (?_) {};
    };

    let newRating : Rating = {
      rating;
      review;
    };

    switch (ratings.get(productId)) {
      case (null) { ratings.add(productId, [newRating]) };
      case (?existingRatings) {
        ratings.add(productId, existingRatings.concat([newRating]));
      };
    };
  };

  public query ({ caller }) func getRatings(productId : Text) : async [Rating] {
    switch (ratings.get(productId)) {
      case (null) { [] };
      case (?productRatings) { productRatings };
    };
  };

  public query ({ caller }) func getAverageRating(productId : Text) : async Nat {
    switch (ratings.get(productId)) {
      case (null) { 0 };
      case (?productRatings) {
        let sum = productRatings.foldLeft(0, func(acc, r) { acc + r.rating });
        if (productRatings.size() > 0) {
          let d = sum / productRatings.size();
          if (d > 0) { d } else { 1 };
        } else { 0 };
      };
    };
  };

  public query ({ caller }) func getAllRatings() : async [(Text, [Rating])] {
    ratings.toArray();
  };
};
