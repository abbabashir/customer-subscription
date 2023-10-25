const { MongoClient } = require("mongodb");

async function main() {
    
    const uri = "mongodb+srv://abbabashir:82206736@cluster0.gcjcs.mongodb.net/?retryWrites=true&w=majority";

    const client = new MongoClient(uri);
    
    try {
        await client.connect();

        await createListing(client, {
            name: "Lovely Loft",
            password: 12345
        })
        

    } catch (e) {
        console.error(e);
    } finally {
        await client.close();
    }
}

main().catch(console.error);

async function createMultipleLisitngs(client, newListing) {

}

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
