function makeDash() {
    gaugeChart("health");
    if ($("#servers_ADT").length) {
        Custom.bulletList("servers_ADT", data.level1.cust.adt.servers);
    }
    if ($("#servers_SEFCU").length) {
        Custom.bulletList("servers_SEFCU", data.level1.cust.sefcu.servers);
    }
    Custom.bulletBarList("apps", data.level1.cust.adt.apps);
    Custom.bulletList("cust_adt_windows_bullets", data.level1.cust.adt.windows.bullets);
    Custom.bulletList("cust_adt_iis_bullets", data.level1.cust.adt.iis.bullets);
    Custom.bulletList("cust_adt_sqlserver_bullets", data.level1.cust.adt.sqlserver.bullets);
    Custom.bulletList("cust_vmware_bullets", data.level1.cust.adt.vmWare.bullets);
}
