import { User } from "../../../shared/user";
import React from "react";

export type UserNameProps = {
    user: User;
}

export function UserName(props: UserNameProps) {
    const userName = props.user.name ?? props.user.email
    return (
      <a href={`mailto:${props.user.email}`}>
          {userName}
      </a>
    )
}