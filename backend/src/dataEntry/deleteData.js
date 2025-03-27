import prisma from "../prismaClient.js"

async function deleteEntry() {
  try {
    await prisma.package.delete({
      where: {
        id: 3,
      },
    })

    console.log("Entry deleted successfully.")
  } catch (error) {
    console.error("Error deleting entry:", error)
  } finally {
    await prisma.$disconnect()
  }
}

deleteEntry()
