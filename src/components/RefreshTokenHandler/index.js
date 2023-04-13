import { useSession } from "next-auth/react";
import { useEffect } from "react";

const RefreshTokenHandler = (props) => {
    const { data: session } = useSession();
    const { setInterval } = props;

    useEffect(() => {
        if(!!session) {
            // We did set the token to be ready to refresh after 23 hours, here we set interval of 23 hours 30 minutes.
            const timeRemaining = Math.round((((session.accessTokenExpiry - 4 * 60 * 1000) - Date.now()) / 1000));
            
            setInterval(timeRemaining > 0 ? timeRemaining : 0);
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [session]);

    return null;
}

export default RefreshTokenHandler;