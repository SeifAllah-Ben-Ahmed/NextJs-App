import Link from "next/link";
import Image from "next/image";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { FaPencilAlt, FaTimes } from "react-icons/fa";
import Layout from "@/components/Layout";
import { API_URL } from "@/config/index";
import styles from "@/styles/Event.module.css";
import { useRouter } from "next/router";

export default function EventPage({ event }) {
    const router = useRouter();

    return (
        <Layout>
            <div className={styles.event}>
                <span>
                    {new Date(event.date).toLocaleDateString("en-US")} at{" "}
                    {event.time}
                </span>
                <h1>{event.name}</h1>
                <ToastContainer />
                {event.image && (
                    <div className={styles.image}>
                        <Image
                            src={event.image.formats.medium.url}
                            width={960}
                            height={600}
                            alt={event.name}
                        />
                    </div>
                )}
                <h3>Performers :</h3>
                <p>{event.performers}</p>
                <h3>Description:</h3>
                <p> {event.description} </p>
                <h3> Venue:</h3>
                <p> {event.venue} </p>
                <p> {event.address} </p>
                <Link href="/events">
                    <a className={styles.back}>{"<"} Go Back</a>
                </Link>
            </div>
        </Layout>
    );
}
export async function getServerSideProps({ query: { slug } }) {
    const res = await fetch(`${API_URL}/events?slug=${slug}`);
    const event = await res.json();
    return {
        props: { event: event[0] },
    };
}

// export async function getStaticPaths() {
//     const res = await fetch(`${API_URL}/events`);
//     const events = await res.json();
//     const paths = events.map((event) => ({
//         params: { slug: event.slug },
//     }));
//     return {
//         paths,
//         fallback: true, //false : if notFound redirect to 404page
//     };
// }
// export async function getStaticProps({ params: { slug } }) {
//     const res = await fetch(`${API_URL}/events?slug=${slug}`);
//     const event = await res.json();

//     return {
//         props: { event: event[0] },
//         revalidate: 1,
//     };
// }
