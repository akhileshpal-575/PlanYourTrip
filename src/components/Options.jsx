const SelectTravelsList = [
    {
      id: 1,
      icon: "🚶‍♂️",
      type: "Solo Travel",
      numberOfPeople: "1 Person",
      description: "Perfect for solo adventurers seeking personal experiences and freedom.",
    },
    {
      id: 2,
      icon: "👫",
      type: "Couple Travel",
      numberOfPeople: "2 People",
      description: "Ideal for romantic getaways and memorable experiences with a loved one.",
    },
    {
      id: 3,
      icon: "👨‍👩‍👧‍👦",
      type: "Family Trip",
      numberOfPeople: "3+ People",
      description: "Enjoy quality time with your family and create lasting memories together.",
    },
    {
      id: 4,
      icon: "🧑‍🤝‍🧑",
      type: "Group Travel",
      numberOfPeople: "4+ People",
      description: "Best for group adventures with friends or colleagues for maximum fun!",
    },
  ];
  
  const SelectBudgetOptions = [
    {
      id: 1,
      icon: "💰",
      title: "Budget Travel",
      description: "Affordable trips with a focus on savings while still enjoying great experiences.",
    },
    {
      id: 2,
      icon: "💳",
      title: "Standard Travel",
      description: "A balanced travel experience with comfortable accommodations and amenities.",
    },
    {
      id: 3,
      icon: "👑",
      title: "Luxury Travel",
      description: "High-end travel with premium services, luxury stays, and exclusive experiences.",
    },
  ];
  
  export { SelectTravelsList, SelectBudgetOptions };
  export const AI_PROMPT = `Generate a travel plan for the destination: {location} for {totalDays} days. 
  Traveler type: {traveler}, with a {budget} budget. 
  Provide a list of hotel options including the name, address, and the most recent image URL (ensure the URL is working), geo coordinates, rating, and descriptions. 
  Suggest a daily itinerary with place names, details, image URLs, geo coordinates, ticket pricing, ratings, and travel time for each location for {totalDays} days, including the best time to visit. 
  Output in JSON format.`;