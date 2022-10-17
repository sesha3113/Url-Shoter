const { PrismaClient } = require('@prisma/client')

const prisma = new PrismaClient()

async function connect() {
    console.log("ss")
    await prisma.$connect()
}
async function saveShortUrl(url) {
    const urlData = await prisma.url.create({
        data: {
          pk_url: url,
          sk_key: randomAlphaNumeric(5),
        },
      })
      return urlData;
}
async function saveShortUrl(url) {
    const urlData = await prisma.url.create({
        data: {
          pk_url: url,
          sk_key: randomAlphaNumeric(5),
        },
      })
      return urlData;
}

async function getShortUrl(key) {
    const url = await prisma.url.findUnique({
        where: {
            sk_key: key
        }
    })
    return url;
}
async function getAllUrl() {
    const url = await prisma.url.findMany()
    console.log("url", url)
}

const randomAlphaNumeric = length => {
    let s = '';
    Array.from({ length }).some(() => {
      s += Math.random().toString(36).slice(2);
      return s.length >= length;
    });
    return s.slice(0, length);
  };
  
// getUrl()
//   .then(async () => {
//     await prisma.$disconnect()
//   })
//   .catch(async (e) => {
//     console.error(e)
//     await prisma.$disconnect()
//     process.exit(1)
//   })

module.exports = {
    saveShortUrl,
    getShortUrl,
    getAllUrl,
    connect
}