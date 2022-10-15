import { ConnectButton } from "@rainbow-me/rainbowkit"
import Header from "components/Header"
import { Contract } from "components/teset/components"



export default function Home() {
    return (
        <div className="max-w-6xl m-auto">
            <Header />
            <Main />
        </div>
    )
}



const Main = () => {

    const price = useExchangeEthPrice(targetNetwork, mainnetProvider, mainnetProviderPollingTime);

    return <div>mains

        <Contract
            name="YourContract"
            price={price}
            signer={userSigner}
            provider={localProvider}
            address={address}
            blockExplorer={blockExplorer}
            contractConfig={contractConfig}
        />

    </div>

}

