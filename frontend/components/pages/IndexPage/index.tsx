import React, { useState } from "react";
import Layout from "../../Layout";
import Container from "../../Container";
import Separator from "../../Separator";
import SearchBar from "../../Inputs/SearchBar";
import ThemedImage from "../../ThemedImage";
import UseLocationButton from "./Buttons/UseLocation";
import SearchButton from "./Buttons/Search";
import LocationService from "../../../API/Zoo/LocationService";
import getClientCurrentLocation from "../../../helpers/getClientCurrentLocation";
import safeConsole from "../../../helpers/safeConsole";


const IndexPage = () => {
  const [address, setAddress] = useState("");
  const [coords, setCoords] = useState<GeolocationCoordinates | undefined>()
  const [loadingCurrentAddress, setLoadingCurrentAddress] = useState(false)
  const handleOnSearchChange = (value: string) => setAddress(value);
  const handleOnClickCurrentLocation = async () => {
    try {
      setLoadingCurrentAddress(true)
      const location = await getClientCurrentLocation()
      let resp = await LocationService.getAddress(
          location.coords.latitude,
          location.coords.longitude
      )
      resp = resp.sort((a: any, b: any) => b.confidence - a.confidence)
      setAddress(resp[0].formatted)
      setCoords(location.coords)
    }
    catch (e) {
      safeConsole()?.error(e)
    }
    finally {
      setLoadingCurrentAddress(false)
    }
  };
  const handleOnSearch = () => {
    LocationService.getCoordinates(
      "138 Spencer Street, Melbourne, VIC, Australia 3000"
    ).then((e) => console.log({ e }));
    LocationService.getAddress(-37.81, 144.9537046).then((d) =>
      console.log({ d })
    );
  };
  return (
    <Layout nav={false}>
      <Container className="flex md:items-center justify-center min-h-screen bg-no-repeat bg-cover">
        <div className="md:rounded w-screen md:w-[500px] xl:w-[600px] p-6 py-16 md:p-8 bg-white">
          <h1 className="w-full text-4xl font-bold text-gray-700 text-center">
            GeoHash
          </h1>
          <Separator />
          <p className={"text-gray-500 text-center"}>
            This is a test project that I have developed to implement GeoHash
            for location search services.
          </p>
          <Separator padding={8} />
          <div className="flex justify-center">
            <div className="md:w-[500px]">
              <ThemedImage src={require("../../../assets/world.svg")} />
            </div>
          </div>
          <Separator padding={8} />
          <SearchBar
            value={address}
            onChange={handleOnSearchChange}
            placeholder={"Enter your address..."}
          />
          <Separator padding={8} />
          <div className={"justify-center flex"}>
            <UseLocationButton onClick={handleOnClickCurrentLocation} loading={loadingCurrentAddress}/>
            <Separator horizontal />
            <SearchButton onClick={handleOnSearch} />
          </div>
          <Separator padding={8} />
          <div className="flex items-center justify-center">
            <p className="text-gray-500 cursor-pointer hover:underline">
              Create a location
            </p>
          </div>
          <Separator padding={20} />
          <p className="text-sm text-gray-400 text-center font-light">
            Created by Saad Ahmad. The application code, architecture and
            documentation can be found on{" "}
            <a
              className="underline hover:text-gray-800"
              href="https://github.com/SaadAhmad123/test-location-sercice-app"
              target={"_block"}
            >
              github
            </a>
            .
          </p>
        </div>
      </Container>
    </Layout>
  );
};

export default IndexPage;
