import { Box } from "@mui/material";
import MicroCategoriesStatistics from "./admin-dashboard-components/MicroCategoriesStatistics";
import PublicationsViewsStatistics from "./admin-dashboard-components/PublicationsViewsStatistics";
import TopStatistics from './admin-dashboard-components/TopStatistics';

const AdminDashboard = () => {
  return (
    <div style={{ textAlign: "center" }}>
      <h1>Dashboard Administrador</h1>
      <Box>
        <Box sx={{ mb: 4 }}>
          <TopStatistics/>
          <MicroCategoriesStatistics />
          <PublicationsViewsStatistics />
        </Box>
      </Box>
    </div>
  );
};

export default AdminDashboard;