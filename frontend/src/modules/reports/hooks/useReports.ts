// src/modules/reports/hooks/useReports.ts

import { useQuery } from "@tanstack/react-query";

import { reportsService } from "../services/reports.service";

export function useReports() {

  return useQuery({

    queryKey: ["reports"],

    queryFn: reportsService.getAll,

    staleTime: 60_000,

  });

}