import useReactiveRef from "./useReactiveRef";
import MockApiManager from "../API/Managers/MockApiManager";
import onMount from "./onMount";
import onUnmount from "./onUnmount";

const useMockApiService = (directories: any[]) => {
    const {get: mock} = useReactiveRef(new MockApiManager(directories))
    onMount(() => {
        mock().start()
    })
    onUnmount(() => mock().stop())
}

export default useMockApiService