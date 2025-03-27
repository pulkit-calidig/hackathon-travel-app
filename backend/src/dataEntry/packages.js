import prisma from "../prismaClient.js"

async function main() {
  const packages = await prisma.package.createMany({
    data: [
      {
        country: "France",
        city: "Paris",
        packages: {
          STANDARD: {
            id: "PAR_STANDARD_001",
            price: 150.0,
            description: "Basic stay and city tour in London.",
          },
          ECONOMY: {
            id: "PAR_ECONOMY_002",
            price: 100.0,
            description: "Affordable stay with essential amenities in London.",
          },
          LUXURY: {
            id: "PAR_LUXURY_003",
            price: 500.0,
            description: "5-star hotel and exclusive experiences in London.",
          },
        },
      },
      {
        country: "Japan",
        city: "Kyoto",
        packages: {
          STANDARD: {
            id: "KYO_STANDARD_001",
            price: 100.0,
            description: "Budget stay and city tour in Paris.",
          },
          ECONOMY: {
            id: "KYO_ECONOMY_002",
            price: 80.0,
            description: "Basic stay with breakfast included in Paris.",
          },
          LUXURY: {
            id: "KYO_LUXURY_003",
            price: 450.0,
            description: "Premium stay with VIP experiences in Paris.",
          },
        },
      },
      {
        country: "USA",
        city: "New York City",
        packages: {
          STANDARD: {
            id: "NYC_STANDARD_001",
            price: 200.0,
            description: "Comfortable stay and guided tour in Tokyo.",
          },
          ECONOMY: {
            id: "NYC_ECONOMY_002",
            price: 120.0,
            description: "Affordable capsule hotel experience in Tokyo.",
          },
          LUXURY: {
            id: "NYC_LUXURY_003",
            price: 600.0,
            description:
              "Luxury stay with personalized travel concierge in Tokyo.",
          },
        },
      },
    ],
  })

  console.info(`Packages added ${packages.data}`)
}

main()
  .catch((err) => console.error(`Error inserting packages ${err.message}`))
  .finally(async () => await prisma.$disconnect())
