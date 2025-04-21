import { useQuery } from "@tanstack/react-query";
import { getMyOrders } from "../api/endpoints/orders";

function Orders() {
    const { data, isFetching, isError, error, refetch } = useQuery({
        queryKey: ["orders"],
        queryFn: getMyOrders,
    });

    if (isFetching) return <p>Loading...</p>;
    if (isError) return <p>Error: {error.message}</p>;

    const orders = data.data || [];
    return (
        <div>
            <div>
                <h2>Orders</h2>
                <button
                    onClick={() => {
                        refetch();
                    }}
                >
                    refetch
                </button>
            </div>
            <ul>
                {orders.map((order) => (
                    <li key={order._id}>{order._id}</li>
                ))}
            </ul>
        </div>
    );
}

export default Orders;
