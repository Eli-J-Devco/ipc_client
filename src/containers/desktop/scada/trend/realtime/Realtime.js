import Chart from "./chart/Chart";

function Realtime() {
    return (
        <div>
            <div className="row g-4">
                <div className="col-12 col-md-6 col-xl-4">
                    <Chart
                        index={1}
                    />
                </div>

                <div className="col-12 col-md-6 col-xl-4">
                    <Chart
                        index={2}
                    />
                </div>

                <div className="col-12 col-md-6 col-xl-4">
                    <Chart
                        index={3}
                    />
                </div>

                <div className="col-12 col-md-6 col-xl-4">
                    <Chart
                        index={4}
                    />
                </div>

                <div className="col-12 col-md-6 col-xl-4">
                    <Chart
                        index={5}
                    />
                </div>

                <div className="col-12 col-md-6 col-xl-4">
                    <Chart
                        index={6}
                    />
                </div>
            </div>
        </div>
    );
}

export default Realtime;