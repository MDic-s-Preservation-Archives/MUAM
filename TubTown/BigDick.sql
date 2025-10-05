select a.* from(
SELECT vmangos_world.creature_template.entry, vmangos_world.creature_template.name, vmangos_world.creature_template.display_id1,  dbc.db_creaturedisplayinfo_5875.ModelID,
dbc.db_creaturemodeldata_5875.ModelName , row_number() over (partition by dbc.db_creaturemodeldata_5875.ID order by dbc.db_creaturemodeldata_5875.ID desc) as seqnum
FROM vmangos_world.creature_template
inner join dbc.db_creaturedisplayinfo_5875 on vmangos_world.creature_template.display_id1 = dbc.db_creaturedisplayinfo_5875.ID 
inner join dbc.db_creaturemodeldata_5875 on dbc.db_creaturedisplayinfo_5875.ModelID = dbc.db_creaturemodeldata_5875.ID
where vmangos_world.creature_template.npc_flags &2 = 2 or vmangos_world.creature_template.npc_flags &1 = 1) a
where seqnum=1
