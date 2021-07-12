import { useRouter } from 'next/dist/client/router';
import EventList from '../../components/events/event-list';
import ResultsTitle from '../../components/event-detail/results-title';
import Button from '../../components/ui/button';
import ErrorAlert from '../../components/ui/error-alert';
import useSWR from 'swr';
import { useEffect, useState } from 'react';

function FilteredEvetnPage(props) {
	const [loadedEvents, setLoadedEvents] = useState();
	const router = useRouter();

	const filterData = router.query.slug;

	const { data, error } = useSWR(
		'https://max-next-66e41-default-rtdb.europe-west1.firebasedatabase.app/events.json'
	);

	useEffect(() => {
		if (data) {
			const events = [];

			for (const key in data) {
				events.push({
					id: key,
					...data[key],
				});
			}

			setLoadedEvents(events);
		}
	}, [data]);

	if (!loadedEvents) {
		return <p className='center'>Loading...</p>;
	}

	const filteredYear = filterData[0];
	const filteredMonth = filterData[1];

	const numYear = +filteredYear;
	const numMonth = +filteredMonth;

	if (
		isNaN(numYear) ||
		isNaN(numMonth) ||
		numYear > 2030 ||
		numYear < 2021 ||
		numMonth < 1 ||
		numMonth > 12 ||
		error
	) {
		return (
			<>
				<ErrorAlert>
					<p>
						Invalid filter. Please adjust your
						values!
					</p>
				</ErrorAlert>
				<div className='center'>
					<Button link='/events'>
						Show All Events
					</Button>
				</div>
			</>
		);
	}

	const filteredEvents = loadedEvents.filter((event) => {
		const eventDate = new Date(event.date);
		return (
			eventDate.getFullYear() === numYear &&
			eventDate.getMonth() === numMonth - 1
		);
	});

	if (!filteredEvents || filteredEvents.length === 0) {
		return (
			<>
				<ErrorAlert>
					<p>
						No events found for the chosen
						filter!
					</p>
				</ErrorAlert>
				<div className='center'>
					<Button link='/events'>
						Show All Events
					</Button>
				</div>
			</>
		);
	}

	const date = new Date(numYear, numMonth - 1);

	return (
		<>
			<ResultsTitle date={date} />
			<EventList events={filteredEvents} />
		</>
	);
}

export default FilteredEvetnPage;
