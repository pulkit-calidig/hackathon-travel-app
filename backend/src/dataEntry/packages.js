import prisma from "../prismaClient.js"

async function main() {
  const countryName = "USA"
  const cityName = "New York City"

  let country = await prisma.country.findUnique({
    where: { name: countryName },
  })

  if (!country) {
    country = await prisma.country.create({
      data: { name: countryName },
    })
  }

  const city = await prisma.city.create({
    data: {
      name: cityName,
      countryId: country.id,
      packages: {
        create: [
          {
            type: "STANDARD",
            price: 1050.0,
            description: `Basic stay and city tour in ${cityName}.`,
          },
          {
            type: "ECONOMY",
            price: 2030.0,
            description: `Affordable stay with essential amenities in ${cityName}.`,
          },
          {
            type: "LUXURY",
            price: 4200.0,
            description: `5-star hotel and exclusive experiences in ${cityName}.`,
          },
        ],
      },
    },
  })

  console.info(
    `City ${city.name} and packages added under country ${country.name}`
  )
}

main()
  .catch((err) => console.error(`Error inserting packages ${err.message}`))
  .finally(async () => await prisma.$disconnect())
