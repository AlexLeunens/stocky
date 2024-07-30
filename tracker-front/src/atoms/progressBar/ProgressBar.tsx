import React from "react";
import "./ProgressBar.scss"

type ProgressBarProps = {
}

export type ProgressBarRef = {
    runProgress: (times: number) => void,
}

const ProgressBar = React.forwardRef<ProgressBarRef, ProgressBarProps>((props, ref) => {
    const [running, setRunning] = React.useState<boolean>(false);
    const [looping, setLooping] = React.useState<boolean>(false);

    React.useImperativeHandle(ref, () => ({
        runProgress
    }));

    const runProgress = (times: number) => {
        runProgressLoop(0, times)
    }

    const runProgressLoop = (i: number, limit: number) => {
        setLooping(true);

        if (i >= limit) {
            setRunning(false);
            setLooping(false);
            return;
        }

        setTimeout(() => {
            setRunning(false);
            runProgressLoop(++i, limit)
        }, 12500);
    }

    React.useEffect(() => {
        if (!running && looping) {
            setTimeout(() => {
                setRunning(true);
            }, 5); // ugly hack
        }
    }, [running, looping])

    if (!running && !looping) {
        return (
            <></>
        )
    }

    return (
        <div>
            <div className="progress-bar">
                <div
                    className="progress-bar-completion"
                    style={{
                        transition: running ? `ease-in-out ${12}s width` : 'none',
                        width: running ? "100%" : "0%"
                    }}
                />
            </div>
        </div>
    )
});

export default ProgressBar;