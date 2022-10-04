import React, { useState } from "react";
import Layout from "../../Layout";
import Container from "../../Container";
import Separator from "../../Separator";
import SearchBar from "../../Inputs/SearchBar";
import ThemedImage from "../../ThemedImage";
import UseLocationButton from "./Buttons/UseLocation";
import SearchButton from "./Buttons/Search";


const IndexPage = () => {
    const [search, setSearch] = useState("");
    const handleOnSearchChange = (value: string) => setSearch(value);
    const handleOnClickCurrentLocation = () => {};
    const handleOnSearch = () => {}
    return (
        <Layout nav={false}>
            <Container className="flex md:items-center justify-center min-h-screen bg-no-repeat bg-cover"
                       style={{backgroundImage: `url(${require("../../../assets/blue-black-material-design-8k-ui.jpeg")?.default?.src})`}}>
                <div className="md:border md:rounded w-screen md:w-[500px] xl:w-[600px] p-6 py-16 md:p-8 bg-white shadow-lg">
                    <h1 className="w-full text-4xl font-bold text-gray-700 text-center">
                        GeoHash
                    </h1>
                    <Separator />
                    <p className={"text-gray-400 text-center"}>
                        This is a test project that I have developed to implement GeoHash
                        for location search services.
                    </p>
                    <Separator padding={8} />
                    <div className="flex justify-center">
                        <div className="md:w-[500px]">
                            <ThemedImage src={require("../../../assets/world.svg")}/>
                        </div>
                    </div>
                    <Separator padding={8} />
                            <SearchBar
                                value={search}
                                onChange={handleOnSearchChange}
                                placeholder={"Enter your address..."}
                            />
                    <Separator padding={8}/>
                    <div className={"justify-center flex"}>
                        <UseLocationButton onClick={handleOnClickCurrentLocation}/>
                        <Separator horizontal/>
                        <SearchButton onClick={handleOnSearch}/>
                    </div>
                    <Separator padding={8}/>
                    <div className="flex items-center justify-center">
                        <p className="text-gray-500 cursor-pointer hover:underline">Create a location</p>
                    </div>
                </div>
            </Container>
        </Layout>
    );
};

export default IndexPage;
