import { useParams } from "react-router-dom";

const RequestedItemPage = () => {
    const { id } = useParams();
    return (
        <main>
            Requested Item Page. Item: {id}
        </main>
    )
}

export default RequestedItemPage