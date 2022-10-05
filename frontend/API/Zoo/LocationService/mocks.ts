import {MockRestResolver} from "../../Managers/types";

export const mockGetAddressOrCoordinates: MockRestResolver = (req, res, context) => {
    return res(
        context.status(200),
        context.delay(2000),
        context.json({
            message: "address or coordinates"
        })
    )
}