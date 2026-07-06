import { useMemo, useState } from "react";
import { Clapperboard } from "lucide-react";

import { useAuth } from "../../contexts/AuthContext";
import ActivityItem from "./ActivityItem";


type ActivityType = "favorite" | "watchlist" | "profile";


type Activity = {
  id: string;
  type: ActivityType;
  movieId?: number;
  title: string;
  poster?: string;
  time: string;
};



export default function RecentActivity() {

  const { user } = useAuth();

  const activities: Activity[] = user?.activities || [];

  const [showAll, setShowAll] = useState(false);



  const sortedActivities = useMemo(() => {

    return [...activities].sort(
      (a, b) =>
        new Date(b.time).getTime() -
        new Date(a.time).getTime()
    );

  }, [activities]);




  const displayedActivities = useMemo(() => {

    return showAll
      ? sortedActivities
      : sortedActivities.slice(0, 3);

  }, [sortedActivities, showAll]);





  const grouped = useMemo(() => {

    return displayedActivities.reduce(

      (acc, item) => {


        const key =
          new Date(item.time).toDateString() ===
          new Date().toDateString()
            ? "Today"
            : "Older";



        if (!acc[key]) {
          acc[key] = [];
        }


        acc[key].push(item);


        return acc;

      },

      {} as Record<string, Activity[]>

    );


  }, [displayedActivities]);





  return (

    <section>


      {/* Header */}

      <div className="flex items-center justify-between mb-5">

        <h3 className="text-lg font-semibold text-gray-900">
          Recent Activity
        </h3>


        {activities.length > 0 && (

          <button
            onClick={() => setShowAll(prev => !prev)}
            className="
              text-sm
              font-medium
              text-violet-600
              hover:text-violet-700
              transition-colors
            "
          >

            {showAll ? "Show Less" : "View All"}

          </button>

        )}


      </div>





      {/* Empty State */}

      {activities.length === 0 ? (

        <div className="py-5 text-center">


          <div className="mb-3 flex justify-center text-gray-400">

            <Clapperboard size={36}/>

          </div>



          <p className="font-medium text-gray-700">
            No activity yet
          </p>



          <p className="mt-1 text-sm text-gray-500">
            Your recent movie actions will appear here.
          </p>



        </div>



      ) : (



        <div className="space-y-6">


          {Object.entries(grouped).map(
            
            ([group, items]) => (


            <div key={group}>


              <h4
                className="
                  mb-3
                  text-xs
                  font-semibold
                  uppercase
                  tracking-wider
                  text-gray-400
                "
              >

                {group}

              </h4>





              <div className="space-y-3">


                {items.map((act) => (


                  <div

                    key={act.id}

                    className="
                      rounded-2xl
                      bg-white
                      p-3
                      shadow-sm
                      hover:shadow-md
                      transition-all
                    "

                  >


                    <ActivityItem

                      image={act.poster}

                      type={act.type}

                      time={
                        new Date(act.time)
                        .toLocaleString()
                      }


                      title={

                        act.type === "watchlist"

                        ? `Added ${act.title} to watchlist`

                        : act.type === "favorite"

                        ? `Added ${act.title} to favorites`

                        : "Updated profile"

                      }

                    />


                  </div>


                ))}


              </div>


            </div>


          ))}


        </div>


      )}


    </section>

  );

}