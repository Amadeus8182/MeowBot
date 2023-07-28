module.exports = {
    name:'get_gif',
    async execute(search) {
        url = `https://g.tenor.com/v2/search?q=${search}&key=${process.env.TENORKEY}&limit=50`;
        response = await fetch(url);
        let json = await response.json();

        const index = Math.floor((Math.random() * json.results.length))
        return json.results[index].media_formats.gif.url, index
    }
}
