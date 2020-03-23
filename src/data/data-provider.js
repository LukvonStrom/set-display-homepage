
export class DataProvider {
    static async getSets() {
        let url = "https://fruntke.tech/quarantine/data.json";
        if(process.env.NODE_ENV !== "production"){
            url = "http://quarantine-sets.s3-website.eu-central-1.amazonaws.com/"
        }
        let response = await fetch(url, {cache: "no-store"});
        let json = await response.json();
        return json.data;
    }

}
