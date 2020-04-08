
export class DataProvider {
    static async getSets() {
        let url = `https://${window.location.hostname}/quarantine/data.json`;
        if(process.env.NODE_ENV !== "production"){
            url = "http://quarantine-sets.s3-website.eu-central-1.amazonaws.com/"
        }
        let response = await fetch(url, {cache: "no-store"});
        let {data} = await response.json();
        return data.map(set => {
            if (!set.genre) {
                set.genre = "???";
            }
            return set;
        });
    }

}
