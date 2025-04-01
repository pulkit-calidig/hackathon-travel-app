import prisma from "../prismaClient.js"

async function main() {
  const destinations = await prisma.origin.createMany({
    data: [
      {
        name: "Paris",
        country: "France",
        description:
          "The city of love, known for its art, fashion, and the Eiffel Tower.",
        iataCode: "CDG",
      },
      {
        name: "Kyoto",
        country: "Japan",
        description:
          "A cultural hub filled with ancient temples, cherry blossoms, and traditional tea houses.",
        iataCode: "KIX",
      },
      {
        name: "New York City",
        country: "USA",
        description:
          "A bustling metropolis famous for Times Square, Broadway, and the Statue of Liberty.",
        iataCode: "NYC",
      },
      {
        name: "Santorini",
        country: "Greece",
        description:
          "A stunning island with white-washed buildings, blue domes, and breathtaking sunsets.",
        iataCode: "JTR",
      },
      {
        name: "Cape Town",
        country: "South Africa",
        description:
          "Home to Table Mountain, beautiful beaches, and a rich cultural history.",
        iataCode: "CPT",
      },
      {
        name: "Bali",
        country: "Indonesia",
        description:
          "A tropical paradise known for its beaches, rice terraces, and vibrant nightlife.",
        iataCode: "DPS",
      },
      {
        name: "Reykjavik",
        country: "Iceland",
        description:
          "A gateway to stunning natural landscapes, geysers, and the Northern Lights.",
        iataCode: "RKV",
      },
      {
        name: "Dubai",
        country: "UAE",
        description:
          "A modern city with towering skyscrapers, luxury shopping, and desert adventures.",
        iataCode: "DXB",
      },
      {
        name: "Rome",
        country: "Italy",
        description:
          "The Eternal City, home to ancient ruins like the Colosseum and the Vatican.",
        iataCode: "FCO",
      },
      {
        name: "Machu Picchu",
        country: "Peru",
        description: "An iconic Incan citadel nestled in the Andes Mountains.",
        iataCode: "MFT",
      },
    ],
  })

  console.info(`Destinations Added: ${destinations}`)
}

main()
  .catch((err) => console.error(`Error inserting destinations: ${err.message}`))
  .finally(async () => {
    await prisma.$disconnect()
  })
