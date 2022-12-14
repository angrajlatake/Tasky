import { useContext, useEffect } from "react";
import { Link } from "react-router-dom";

import TaskCard from "./Tasks/TaskCard";

import Box from "@mui/material/Box";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import LinearProgress from "@mui/material/LinearProgress";

import { getTasksByUser } from "../api";
import { AuthContext } from "../context/AuthContext";
import { TasksContext } from "../context/TaskContext";

const UserPanel = () => {
  const { user } = useContext(AuthContext);
  const { tasks, dispatch } = useContext(TasksContext);

  useEffect(() => {
    const fetchTasksByUser = async () => {
      if (!tasks) {
        const { data } = await getTasksByUser(user._id);
        dispatch({ type: "FETCH_TASKS", payload: data });
      }
    };
    fetchTasksByUser();
  }, [user._id, dispatch]);

  const filteredTasks =
    tasks && tasks.filter((task) => task.status === "progress");
  const pendingTasks =
    tasks && tasks.filter((task) => task.status === "pending");
  return (
    <Box>
      <Stack spacing={2} sx={{ p: 5 }}>
        <Typography variant="h4" color="primary">
          Hi {user.name},
        </Typography>
        <Typography variant="subtitle1" color="inherit">
          Welcome to Tasky! Your personal Task Management tool.
        </Typography>
        <Typography
          variant="h5"
          color="inherit"
          sx={{ display: "flex", alignItems: "center", gap: 1 }}
        >
          Current Tasks
        </Typography>
        {!tasks ? <LinearProgress /> : null}
        {tasks && filteredTasks.length > 0 ? (
          <Box sx={{ display: "flex", gap: 3, flexWrap: "wrap" }}>
            {filteredTasks.map((filteredTask, index) => (
              <Link
                to={`/tasks/${filteredTask._id}`}
                style={{ textDecoration: "none" }}
                key={filteredTask._id}
              >
                <TaskCard
                  title={filteredTask.title}
                  due={filteredTask.targetDate}
                  status={filteredTask.status}
                />
              </Link>
            ))}
          </Box>
        ) : (
          <Typography variant="body1" color="inherit">
            None
          </Typography>
        )}
        <Typography
          variant="h5"
          color="inherit"
          sx={{ display: "flex", alignItems: "center", gap: 1, pt: 2 }}
        >
          Pending Tasks
        </Typography>
        {!tasks ? <LinearProgress /> : null}
        {tasks && pendingTasks.length > 0 ? (
          <Box sx={{ display: "flex", gap: 3, flexWrap: "wrap" }}>
            {pendingTasks.map((filteredTask, index) => (
              <Link
                to={`/tasks/${filteredTask._id}`}
                style={{ textDecoration: "none" }}
                key={filteredTask._id}
              >
                <TaskCard
                  title={filteredTask.title}
                  due={filteredTask.targetDate}
                  status={filteredTask.status}
                />
              </Link>
            ))}
          </Box>
        ) : (
          <Typography variant="body1" color="inherit">
            None
          </Typography>
        )}
      </Stack>
    </Box>
  );
};

export default UserPanel;
