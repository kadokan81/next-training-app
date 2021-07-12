import EventList from '../components/events/event-list';
import { getFeaturedEvents } from '../dummy-data';
import Head from 'next/head';

const HomePage = ({ curEvent }) => {
	return (
		<>
			<Head>
				<title>NextJS Events</title>
				<meta
					name='description'
					content='Find a lot of great events that allow you to evolve... '
				/>
			</Head>
			<EventList events={curEvent} />
		</>
	);
};

export const getStaticProps = async () => {
	const res = await fetch(
		'https://max-next-66e41-default-rtdb.europe-west1.firebasedatabase.app/events.json'
	);
	const data = await res.json();

	const curEvent = [];
	for (const key in data) {
		curEvent.push({
			id: key,
			...data[key],
		});
	}

	return {
		props: {
			curEvent: curEvent,
		},
		revalidate: 1800,
	};
};

export default HomePage;
