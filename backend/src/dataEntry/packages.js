import prisma from "../prismaClient.js"

async function main() {
  const packages = await prisma.package.createMany({
    data: [
      {
        country: "France",
        city: "Paris",
        packages: {
          STANDARD: {
            price: 150.0,
            description: "Basic stay and city tour in London.",
          },
          ECONOMY: {
            price: 100.0,
            description: "Affordable stay with essential amenities in London.",
          },
          LUXURY: {
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
            price: 100.0,
            description: "Budget stay and city tour in Paris.",
          },
          ECONOMY: {
            price: 80.0,
            description: "Basic stay with breakfast included in Paris.",
          },
          LUXURY: {
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
            price: 200.0,
            description: "Comfortable stay and guided tour in Tokyo.",
          },
          ECONOMY: {
            price: 120.0,
            description: "Affordable capsule hotel experience in Tokyo.",
          },
          LUXURY: {
            price: 600.0,
            description:
              "Luxury stay with personalized travel concierge in Tokyo.",
          },
        },
      },
    ],
  })

  console.info(`Packages added ${packages}`)
}

main()
  .catch((err) => console.error(`Error inserting packages ${err.message}`))
  .finally(async () => await prisma.$disconnect())
