const { MongoClient } = require("mongodb");

async function main() {
    
    const uri = "mongodb+srv://abbabashir:82206736@cluster0.gcjcs.mongodb.net/?retryWrites=true&w=majority";

    const client = new MongoClient(uri);
    
    try {
        await client.connect();

        // await findOneListingByName(client, "Admin")
        

        // await findAllAdminListing(client, {
        //     maximumPasswords: 1
        // })

        /*
        await createMultipleLisitngs(client, [
            {
                name: "Admin",
                password: 1234
            },
            {
                name: "lorem",
                password: 8220
            },
            {
                name: "paritie",
                password: "dynamic"
            }
        ]) */
        

    } catch (e) {
        console.error(e);
    } finally {
        await client.close();
    }
}

main().catch(console.error);

/*Multiple findings*/

// async function findAllAdminListing(client, {
//     maximumPasswords = 0,
//     maximumNumberOfResults = Number.MAX_SAFE_INTEGER
// } = {}){
//     const cursor = client.db("paritie_admin").collection("adminTable").find({
//         passwords: {$gte: maximumPasswords},
//     }).sort({ name: -1 })
//     .limit(maximumNumberOfResults)

//     const results = await cursor.toArray()

//     if (results.length > 0) {
//         console.log(`Found Listing(s) with at least ${maximumPasswords}`);
//         results.forEach((result, i) => {
//             // date = new Date(result.name).toDateString();
//             console.log();
//             console.log(`${i + 1}. name: ${result.name}`);
//             console.log(`  _id ${result._id}`);
//             console.log(`  password: ${result.password}`);
//             // console.log(`  most recent review date ${new Date (result.name).toDateString()}`);
//         });
//     } else {
//         console.log(`No listings found with at least ${maximumPasswords}`);
//     }
// }

/*Finding One Listing By Name*/
async function findOneListingByName(client, nameOfListing) {
    const result = await client.db("paritie_admin").collection("adminTable").findOne({name: nameOfListing})

    if (result) {
        console.log(`Found a listing in the collection with the name ${nameOfListing}`);
        console.log(result);
    } else {
        console.log(`No listing found with the name ${nameOfListing}`);
    }
}


/* Adding Multiple Inputs Into The Collection */ 
async function createMultipleLisitngs(client, newListings) {
    const result = await client.db("paritie_admin").collection("adminTable").insertMany(newListings)

    console.log(`${result.insertedCount} new listings created with the following id(s):`);
    console.log(result.insertedIds);
}

/* Adding Single Inputs Into The Collection*/ 
async function createListing(client, newListing) {
    const result = await client.db("paritie_admin").collection("adminTable").insertOne(newListing);

    console.log(`New listing created with the following id: ${result.insertedId}`);
}

async function listDatabases(client) {
    const databaseList = await client.db().admin().listDatabases();
    console.log("Databases:");
    databaseList.databases.forEach(db  => {
        console.log(`- ${db.name}`);
    });
}
