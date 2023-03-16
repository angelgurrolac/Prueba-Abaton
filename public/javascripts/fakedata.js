const data = {
    level0: {
        alerts: [
            {
                sem: "yellow",
                label: "Backup job ADT-SSTOB-Backup has failed.",
            },
            { sem: "yellow", label: "Application Pool DAService is Stopped." },
        ],
        cust: {
            adt: {
                bullets: [
                    { sem: "green", label: "Applications " },
                    { sem: "green", label: "Windows " },
                    { sem: "yellow", label: "IIS " },
                    { sem: "red", label: "SQL Server " },
                ],
            },
            sefcu: {
                bullets: [
                    { sem: "yellow", label: "Applications " },
                    { sem: "green", label: "Windows " },
                    { sem: "red", label: "IIS " },
                    { sem: "green", label: "SQL Server " },
                ],
            },
        },
        infra: {
            elk: {
                bullets: [
                    { sem: "green", label: "Nodes" },
                    { sem: "green", label: "Indices" },
                    { sem: "green", label: "Performance" },
                    { sem: "yellow", label: "Disk space" },
                ],
            },
            azure: {
                bullets: [
                    { sem: "green", label: "Backups" },
                    { sem: "green", label: "Performance" },
                    { sem: "green", label: "Networks" },
                    { sem: "green", label: "Active Directory" },
                ],
            },
        },
        elk: {
            nodes: [
                { sem: "", label: "", status: "" },
                { sem: "green", label: "cldxa-data-0 Data", status: "76%" },
                {
                    sem: "green",
                    label: "cldxa-data-1 Data, Master",
                    status: "72%",
                },
                { sem: "yellow", label: "cldxa-data-2 Data", status: "84%" },
                { sem: "green", label: "cldxa-data-4 Data", status: "73%" },
                { sem: "", label: "", status: "" },
                { sem: "", label: "", status: "" },
                { sem: "green", label: "cldxa-logstash Logstash", status: "" },
                { sem: "green", label: "cldxa-kibana Kibana", status: "" }
            ],
            agents: [
                { label: "ADT—SQL", m: "green", w: "green", f: "green" },
                { label: "ADT-App-1", m: "green", w: "green", f: "green" },
                { label: "ADT-WEB-1", m: "green", w: "red", f: "green" },
                { label: "SEFCU-APP-1", m: "green", w: "green", f: "green" },
                { label: "SEFCU-APP-2", m: "green", w: "green", f: "green" },
                { label: "SEFCU-SQL-1", m: "green", w: "green", f: "green" },
                { label: "SEFCU-SQL-2", m: "green", w: "green", f: "green" }
            ],
            indices: [
                {sem: "green", label: "metricbeat-2022-05-023-0004", n1: 1, n2: 1, used: "732,002", total: "278,160,265", plus: "+" },
                {sem: "green", label: "metricbeat-2022-05-015-0008", n1: 1, n2: 1, used: "294,496", total: "108,609,123", plus: "+" },
                {sem: "green", label: "metricbeat-2022-04-006-0003", n1: 1, n2: 1, used: "222,404", total: "13,093,096", plus: "+" },
                {sem: "green", label: "metricbeat-2022-01-020-0003", n1: 1, n2: 1, used: "615,674", total: "604,188,815", plus: "+" },
                {sem: "green", label: "metricbeat-2022-03-030-0003", n1: 1, n2: 1, used: "391,644", total: "223,191,882", plus: "+" },
                {sem: "green", label: "adt-sql-logs-2022-02", n1: 1, n2: 1, used: "538,767", total: "82,912,957", plus: "+" },
                {sem: "green", label: "adt-sql-logs-2022-05", n1: 1, n2: 1, used: "467,674", total: "202,007,894", plus: "+" },
                {sem: "green", label: "adt-sql-logs-2022-05", n1: 1, n2: 1, used: "190,795", total: "154,637,215", plus: "+" },
                {sem: "green", label: "adt-iis-access-2022-02", n1: 1, n2: 1, used: "636,266", total: "52,482,348", plus: "+" },
                {sem: "green", label: "adt-iis-access-2022-03", n1: 1, n2: 1, used: "980,341", total: "470,331,033", plus: "+" }
            ],
        },
    },
    level1: {
        cust: {
            adt: {
                servers: [
                    { sem: "green", label: "SVRBRN0001" },
                    { sem: "green", label: "SVRBRN0002" },
                    { sem: "green", label: "SVRCNTAPP1" },
                    { sem: "green", label: "SVRCNTAPP2" },
                    { sem: "green", label: "SVRBRN0001" },
                    { sem: "green", label: "SVRBRN0002" },
                    { sem: "green", label: "SVRBRN0003" },
                    { sem: "green", label: "SVRBRN0004" },
                ],
                apps: [
                    { sem: "green", label: "Dispatcher", score: 0.94 },
                    {
                        sem: "green",
                        label: "Incident Management System",
                        score: 0.96,
                    },
                    { sem: "yellow", label: "Administration", score: 0.84 },
                    { sem: "green", label: "Reports Portal", score: 0.92 },
                    { sem: "yellow", label: "Data analyzer", score: 0.77 },
                    { sem: "green", label: "Monitoring", score: 0.93 },
                    { sem: "green", label: "Cash Optimizer", score: 0.92 },
                    { sem: "green", label: "Cash Optimizer 2", score: 0.92 },
                    {
                        sem: "green",
                        label: "Role based access control",
                        score: 0.98,
                    },
                ],
                windows: {
                    bullets: [
                        { sem: "green", label: "Availability " },
                        { sem: "green", label: "CPU" },
                        { sem: "green", label: "RAM" },
                        { sem: "green", label: "Disk" },
                    ],
                },
                sqlserver: {
                    bullets: [
                        { sem: "green", label: "Services" },
                        { sem: "green", label: "Databases" },
                        { sem: "red", label: "Backup jobs" },
                        { sem: "green", label: "Cluster/Replication" },
                        { sem: "yellow", label: "Transaction logs" },
                    ],
                },
                vmWare: {
                    bullets: [
                        { sem: "green", label: "ESXi - HX-COR-N1" },
                        { sem: "green", label: "Maquinas virtuales 10" },
                        { sem: "red", label: "ESXi - HX-COR-N2" },
                        { sem: "red", label: "Maquinas virtuales 25" },
                        { sem: "yellow", label: "ESXi - HX-COR-N3" },
                        { sem: "yellow", label: "Maquinas virtuales 14" }
                    ],
                },
                iis: {
                    bullets: [
                        { sem: "green", label: "Response time" },
                        { sem: "green", label: "Response codes" },
                        { sem: "red", label: "Application Pools" },
                    ],
                },
            },
            sefcu: {
                servers: [
                    { sem: "green", label: "SEFCU-App-1" },
                    { sem: "green", label: "SEFCU-App-2" },
                    { sem: "yellow", label: "SEFCU-SQL-1" },
                    { sem: "green", label: "SEFCU-SQL-2" },
                    { sem: "green", label: "SEFCU-WEB-1" },
                    { sem: "yellow", label: "SEFCU-WEB-2" },
                ]
            },
        },
        azure: {
            backups: [
                { sem: "green", label: "Azure-Backup-Job-1", status: "2022-07-12 04:57:58" },
                { sem: "green", label: "Azure-Backup-Job-2", status: "022-07-15 18:40:42" },
                { sem: "red", label: "Azure-Backup-Job-3", status: "2022-07-16 16:03:38" },
                { sem: "green", label: "Azure-Backup-Job-4", status: "2022-07-12 17:16:45" },
                { sem: "green", label: "Azure-Backup-Job-5", status: "2022-07-17 23:51:27" },
                { sem: "green", label: "Azure-Backup-Job-6", status: "2022-07-15 08:08:38" },
                { sem: "green", label: "Azure-Backup-Job-7", status: "2022-07-17 16:57:42" },
            ],
            networkGroup: [
                { sem: "green", label: "NetworkGroup - 1" },
                { sem: "green", label: "NetworkGroup - 2" },
            ],
            networks: [
                { sem: "green", label: "VirtualNetwork1" },
                { sem: "green", label: "VirtualNetwork2" },
                { sem: "green", label: "VirtualNetwork3" },
                { sem: "green", label: "VirtualNetwork4" },
                { sem: "green", label: "VirtualNetwork5" },
            ],
            networksDetail: [
                { sem: "green", label: "VirtualNetwork1", bytesin: fmt("n")(Math.round((Math.random() * (1 - 2) + 2) * 100000)), bytesout: fmt("n")(Math.round((Math.random() * (1 - 2) + 2) * 100000)) },
                { sem: "green", label: "VirtualNetwork2", bytesin: fmt("n")(Math.round((Math.random() * (1 - 2) + 2) * 100000)), bytesout: fmt("n")(Math.round((Math.random() * (1 - 2) + 2) * 100000)) },
                { sem: "green", label: "VirtualNetwork3", bytesin: fmt("n")(Math.round((Math.random() * (1 - 2) + 2) * 100000)), bytesout: fmt("n")(Math.round((Math.random() * (1 - 2) + 2) * 100000)) },
                { sem: "green", label: "VirtualNetwork4", bytesin: fmt("n")(Math.round((Math.random() * (1 - 2) + 2) * 100000)), bytesout: fmt("n")(Math.round((Math.random() * (1 - 2) + 2) * 100000)) },
                { sem: "green", label: "VirtualNetwork5", bytesin: fmt("n")(Math.round((Math.random() * (1 - 2) + 2) * 100000)), bytesout: fmt("n")(Math.round((Math.random() * (1 - 2) + 2) * 100000)) },
            ],
        },
    },
    level2: {
        cust: {
            adt: {
                servers: [
                    { sem: "green", label: "ADT--SQL" },
                    { sem: "green", label: "ADT-App-1" },
                    { sem: "green", label: "ADT-WEB-1" },
                ],
                pools: [
                    { sem: "red", label: "DAService", status: "Stopped" },
                    { sem: "green", label: "COClient", status: "Started" },
                    { sem: "green", label: "COService", status: "Started" },
                    { sem: "green", label: "DA", status: "Started" },
                    { sem: "green", label: "I18NService", status: "Started" },
                ],
                sqlserver: {
                    services: [
                        {
                            sem: "green",
                            label: "MSSQLSERVER",
                            status: "Running",
                        },
                        { sem: "green", label: "SQLAGENT", status: "Running" },
                        {
                            sem: "green",
                            label: "SQLBrowser",
                            status: "Running",
                        },
                        {
                            sem: "green",
                            label: "SQLTELEMETRY",
                            status: "Running",
                        },
                        { sem: "green", label: "SQLWriter", status: "Running" },
                    ],
                    databases: [
                        { sem: "green", label: "ATMTA" },
                        { sem: "green", label: "ATMTXNDB" },
                        { sem: "green", label: "CashManagementDB" },
                        { sem: "green", label: "Dispatcher" },
                        { sem: "green", label: "DVDB" },
                    ],
                    backup: [
                        {
                            sem: "red",
                            label: "Backup cleanup.Subplan_1",
                        },
                        {
                            sem: "green",
                            label: "Database Backups.Subplan_3",
                        },
                        {
                            sem: "green",
                            label: "Trans cleanup.Subplan_1",
                        },
                        {
                            sem: "green",
                            label: "Database Backups.Subplan_1",
                        },
                        {
                            sem: "green",
                            label: "Database Backups.Subplan_2",
                        },
                    ],
                    cluster: [
                        {
                            sem: "red",
                            label: "SQL-2 SSTOB",
                            status: "SECONDARY",
                        },
                        {
                            sem: "green",
                            label: "SQL-1 ReportPortal",
                            status: "PRIMARY",
                        },
                        {
                            sem: "green",
                            label: "SQL-1 DVDB",
                            status: "PRIMARY",
                        },
                        {
                            sem: "green",
                            label: "SQL-1 SSTOB",
                            status: "PRIMARY",
                        },
                        {
                            sem: "green",
                            label: "SQL-1 SSTRMM",
                            status: "PRIMARY",
                        },
                        {
                            sem: "green",
                            label: "SQL-1 RBAC",
                            status: "PRIMARY",
                        },
                        {
                            sem: "green",
                            label: "SQL-2 DVDB",
                            status: "SECONDARY",
                        },
                        {
                            sem: "green",
                            label: "SQL-2 SSTRMM",
                            status: "SECONDARY",
                        },
                        {
                            sem: "green",
                            label: "SQL-2 Dispatcher",
                            status: "SECONDARY",
                        },
                    ],
                },
            },
        },
    },
};
