import "./MeetingRoom.scss";

function MeetingRoom() {
    const meeting_cell = function (i, j, color) { return (
        <div style={{
                gridColumn: `${i}`,
                gridRow: `${j}`,
                border: `1px solid #000`,
                borderRadius: `5px`,
                background: color
            }}
        />
    )};

    return (
        <div className="system-layout">
            <h1>Система Ради УКУ</h1>
            <div className="system-layout__grid">
                {[1, 2, 3, 4].map((i) => (
                    [1, 2, 3].map((j) => (
                        meeting_cell(i, j, "#ff2c2c")
                ))))}

                {[1, 2].map((i) =>
                    meeting_cell(i, 5, "#ff2c2c")
                )}

                {[1, 2, 3, 4].map((i) => (
                    meeting_cell(i, 7, "#C21807")
                ))}

                {[1, 2].map((i) => (
                    meeting_cell(i, 9, "#C21807")
                ))}

                {[3, 4].map((i) => (
                    meeting_cell(i, 10, "#C21807")
                ))}

                {[6, 7, 8, 9].map((i) => (
                    [1, 2].map((j) => (
                        meeting_cell(i, j, "#8bca84")
                ))))}

                {[6, 7].map((i) => (
                    meeting_cell(i, 4, "#8bca84")
                ))}

                {[8, 9].map((i) => (
                    meeting_cell(i, 5, "#8bca84")
                ))}

                {[6, 7].map((i) => (
                    meeting_cell(i, 6, "#8bca84")
                ))}

                {[8, 9].map((i) => (
                    meeting_cell(i, 7, "#8bca84")
                ))}

                {[11, 12, 13, 14].map((i) => (
                    [1, 2].map((j) => (
                        meeting_cell(i, j, "#0077B6")
                ))))}

                {[11, 12].map((i) => (
                    meeting_cell(i, 4, "#0077B6")
                ))}

                {[13, 14].map((i) => (
                    meeting_cell(i, 5, "#0077B6")
                ))}

                {[11, 12].map((i) => (
                    meeting_cell(i, 6, "#0077B6")
                ))}

                {[13, 14].map((i) => (
                    meeting_cell(i, 7, "#0077B6")
                ))}

                {[16, 17, 18, 19].map((i) => (
                    [1, 2, 3].map((j) => (
                        meeting_cell(i, j, "#6f2da8")
                    ))))}

                {[16, 17].map((i) =>
                    meeting_cell(i, 5, "#6f2da8")
                )}

                {[16, 17, 18, 19].map((i) => (
                    meeting_cell(i, 8, "#C21807")
                ))}

                {[18, 19].map((i) => (
                    meeting_cell(i, 10, "#C21807")
                ))}

            </div>
        </div>
    );
}

export default MeetingRoom;