import { Boost } from "@/components/boost";
import { EarningsProvider } from "@/components/earnings";
import { Film } from "@/components/film";
import { HomeStage } from "@/components/home-stage";
import { More } from "@/components/more";
import { Team } from "@/components/team";

export default function Page() {
  return (
    <EarningsProvider>
      <HomeStage>
        <Film />
        <Boost />
        <More />
        <Team />
      </HomeStage>
    </EarningsProvider>
  );
}
