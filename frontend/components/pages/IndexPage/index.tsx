import React, { useState } from "react";
import Layout from "../../Layout";
import Container from "../../Container";
import Separator from "../../Separator";
import SearchBar from "../../Inputs/SearchBar";
import ThemedImage from "../../ThemedImage";
import UseLocationButton from "./Buttons/UseLocationButton";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faSearch} from "@fortawesome/free-solid-svg-icons";


const IndexPage = () => {
    const [search, setSearch] = useState("");
    const handleOnSearchChange = (value: string) => setSearch(value);
    const handleOnClickCurrentLocation = () => {};
    return (
        <Layout nav={false}>
            <Container className="flex items-center justify-center md:pt-[150px]">
                <div className="md:border md:rounded w-screen md:w-[500px] xl:w-[700px] p-6 py-16 md:p-8 bg-white md:shadow-lg">
                    <div className="flex">
                        <ThemedImage src={require("../../../assets/world.svg")} />
                    </div>
                    <Separator padding={20} />
                    <h1 className="w-full text-4xl font-bold text-gray-700 text-center">
                        Saad's GeoHash
                    </h1>
                    <Separator />
                    <p className={"text-gray-400 text-center"}>
                        This is a test project that I have developed to implement GeoHash
                        for location search services.
                    </p>
                    <Separator padding={8} />

                    <Separator padding={8} />
                    <div className={"lg:flex items-center justify-between"}>
                        <div className={"flex-1 lg:mr-4"}>
                            <SearchBar
                                value={search}
                                onChange={handleOnSearchChange}
                                placeholder={"Enter your address..."}
                            />
                        </div>
                        <div className={"flex justify-center mt-4 lg:mt-0"}>
                            <UseLocationButton onClick={handleOnClickCurrentLocation}/>
                        </div>
                    </div>
                    <Separator padding={8}/>
                    <div className={"flex justify-center"}>
                        <button className="py-3 px-6 bg-blue-700 text-white rounded-full text-lg block hover:bg-blue-900 transition-all ease-in duration-100">
                            <span className="mr-2"><FontAwesomeIcon icon={faSearch}/></span>
                            <span>Search</span>
                        </button>
                    </div>
                </div>
            </Container>
        </Layout>
    );
};

export default IndexPage;
