import {Flex} from "@chakra-ui/react";
import UnitCard from "../components/UnitCard";
import API, {Unit} from "../api/api";
import {useLoaderData} from "react-router-dom";

export async function UnitsLoader(): Promise<Unit[]> {
    return await API.Units()
}

export default function Units() {
    let data = useLoaderData() as { units: Unit[] };

    return <Flex
        m={"20px"}
        p={"10px"}
        justifyContent={"left"}
        flexWrap={"wrap"}
    >
        {data.units.map((unit) =>
            <UnitCard pictureUrl={unit.pictureUrl} name={unit.name} key={unit.id} id={unit.id} count={unit.count}/>
        )}
    </Flex>
}
