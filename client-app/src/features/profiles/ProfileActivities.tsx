import { observer } from "mobx-react-lite"
import { Card, Grid, Header, Tab, TabPane, Image, TabProps } from "semantic-ui-react"
import { useStore } from "../../app/stores/store"
import { SyntheticEvent, useEffect } from "react"
import { format } from "date-fns";
import { Link } from "react-router-dom";

const panes = [
  { menuItem: 'Future Events', pane: { key: 'future' } },
  { menuItem: 'Past Events', pane: { key: 'past' } },
  { menuItem: 'Hosting', pane: { key: 'hosting' } }
];

const ProfileActivities = () => {
  const { profileStore: { loadActivities, loadingActivities, activities } } = useStore();

  useEffect(() => {
    loadActivities();
  }, [loadActivities]);

  const handleTabChange = (_: SyntheticEvent, data: TabProps) => {
    loadActivities(panes[data.activeIndex as number].pane.key);
  };

  return (
    <TabPane loading={loadingActivities}>
      <Grid>
        <Grid.Column width={16}>
          <Header floated="left" icon="calendar" content="Activities" />
        </Grid.Column>
        <Grid.Column width={16}>
          <Tab 
            menu={{ secondary: true, pointing: true }} 
            panes={panes} 
            onTabChange={(e, data) => handleTabChange(e, data)}
          />
          <br />
          <Card.Group itemsPerRow={4}>
            {activities.map(activity => (
              <Card
                as={Link}
                to={`/activities/${activity.id}`}
                key={activity.id}
              >
                <Image 
                  src={`/assets/categoryImages/${activity.category}.jpg`}
                  style={{ minHeight: 100, objectFit: 'cover'}}
                />
                <Card.Content>
                  <Card.Header textAlign="center">{activity.title}</Card.Header>
                  <Card.Meta textAlign="center">
                    <div>{format(activity.date!, 'do LLL')}</div>
                    <div>{format(activity.date!, 'h:mm a')}</div>
                  </Card.Meta>
                </Card.Content>
              </Card>
            ))}
          </Card.Group>
        </Grid.Column>
      </Grid>
    </TabPane>
  )
}
export default observer(ProfileActivities)