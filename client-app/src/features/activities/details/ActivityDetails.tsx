import { Grid } from "semantic-ui-react";
import { useStore } from "../../../app/stores/store";
import LoadingComponents from "../../../app/layout/LoadingComponents";
import { observer } from "mobx-react-lite";
import { useParams } from "react-router-dom";
import { useEffect } from "react";
import ActivityDetailedHeader from "./ActivityDetailedHeader";
import ActivityDetailedInfo from "./ActivityDetailedInfo";
import ActivityDetailedChats from "./ActivityDetailedChats";
import ActivityDetailedSidebar from "./ActivityDetailedSidebar";

export default observer(function ActivityDetails() {
    const { activityStore } = useStore();
    const { selectedActivity: activity, loadActivity, loadingInitial, clearSelectedActivity } = activityStore;
    const {id} = useParams();

    useEffect(() => {
        if (id) loadActivity(id);
        return () => clearSelectedActivity();
    }, [id, loadActivity, clearSelectedActivity])

    if (loadingInitial || !activity) return <LoadingComponents />;

    return (
        <Grid>
            <Grid.Column width={10}>
                <ActivityDetailedHeader activity={activity}/>
                <ActivityDetailedInfo activity={activity} />
                <ActivityDetailedChats activityId={activity.id}/>
            </Grid.Column>
            <Grid.Column width={6}>
                <ActivityDetailedSidebar activity={activity} />
            </Grid.Column>
        </Grid>
    )
})