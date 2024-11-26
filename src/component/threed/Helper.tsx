import { FC, Fragment, memo } from "react";

type Props = {
    isGrid: boolean;
    isAxis: boolean;
}

export const Helper: FC<Props> = memo((props) => {
    const { isGrid, isAxis } = props;

    return (
        <Fragment>
            {isAxis && <axesHelper args={[20]} />}
            {isGrid && <gridHelper args={[30, 30]} />}
        </Fragment>
    )
})
