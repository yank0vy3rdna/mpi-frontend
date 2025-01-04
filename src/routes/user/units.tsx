import { Flex } from "@chakra-ui/react";
import { MakeApiFromLocalStorage, Unit, UnitsResponse } from "../../api/interface";
import { useLoaderData, useRevalidator } from "react-router-dom";
import UnitCard from "../../components/unitCard";
import { useEffect } from "react";
import useWSStore from "../../store/wsStore";

export async function UnitsLoader(): Promise<UnitsResponse> {
    return await MakeApiFromLocalStorage().Units()
}

export default function Units() {
    let data = useLoaderData() as { units: Unit[] };
    const registerAstroCallback = useWSStore((state) => state.registerAstroCallback)
    const revalidator = useRevalidator()

    useEffect(() => {
        registerAstroCallback(() => {
            revalidator.revalidate()
        })

        return () => {
            registerAstroCallback(() => { })
        }
    }, [])

    return <Flex
        m={"20px"}
        p={"10px"}
        justifyContent={"left"}
        flexWrap={"wrap"}
    >
        {data.units.map((unit) =>
            <UnitCard pictureUrl={unit.pictureUrl} name={unit.name} key={unit.id} id={unit.id} count={unit.count} price={unit.price} />
        )}
    </Flex>
}
