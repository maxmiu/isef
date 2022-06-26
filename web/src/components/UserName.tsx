import { User } from "../../../shared/user";
import React from "react";
import { Dash } from "../infrastructure/special-characters";

export type UserNameProps = {
    user: User | null | undefined;
}

export function UserName(props: UserNameProps) {
    if(!props.user){
        return <>{Dash}</>
    }
    const userName = props.user.name ?? props.user.email
    return (
      <a href={`mailto:${props.user.email}`}>
          {userName}
      </a>
    )
}