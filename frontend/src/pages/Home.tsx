import { useAuthStore } from "../store/auth.store";

function HomePage() {
    const {user} = useAuthStore();
  return (
    <div>
        name: {user?.name}
    </div>
  )
}

export default HomePage