module.exports = async (client) => {
    console.log("Client is up");

    client.application.commands.set([...client.commands.map(v => v.data)], "895655996205187073");


}