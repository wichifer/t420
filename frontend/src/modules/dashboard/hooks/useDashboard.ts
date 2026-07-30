import { useQuery } from "@tanstack/react-query";

import { dashboardService } from "../services/dashboard.service";
import { dashboardKeys } from "../queries/dashboard.keys";
import type { Dashboard } from "../types/dashboard";

export function useDashboard() {
  return useQuery<Dashboard>({
    queryKey: dashboardKeys.stats(),
    queryFn: dashboardService.getDashboard,
  });
}