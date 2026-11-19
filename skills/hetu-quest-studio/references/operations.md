# 操作地图

由正式清单生成，执行前发现当前安装版Schema。

| 动作 | 用途 | 必填参数 | 效果 |
| --- | --- | --- | --- |
| list_projects | 查找专业工程 |  | read |
| get_project | 读取固定专业工程 | object_id | read |
| save_project | 保存完整专业工程 | expected_revision, expected_sha256, operation_key, content | managed_write |
| get_source | 分块读取固定来源 | object_id, source_index | read |
| get_basis | 读取固定专业依据 | object_id, basis_index | read |
| compare_versions | 比较固定专业修订 | object_id, from_revision, to_revision | read |
| export_project | 分块导出完整专业数据 | object_id, format | read |
| build_context | 准备有界创作上下文 | object_id, goal, max_chars | read |
| create_handoff | 准备本工程AI接续 | object_id, goal | read |
| get_operation | 回读原操作 | operation_key | read |
| put_evidence | 维护固定引文 | object_id, expected_revision, expected_sha256, operation_key, evidence | managed_write |
| put_variable | 维护有界状态 | object_id, expected_revision, expected_sha256, operation_key, variable | managed_write |
| remove_variable | 移除有界状态 | object_id, expected_revision, expected_sha256, operation_key, variable_id | managed_write |
| put_step | 维护任务阶段 | object_id, expected_revision, expected_sha256, operation_key, step | managed_write |
| remove_step | 移除任务阶段 | object_id, expected_revision, expected_sha256, operation_key, step_id | managed_write |
| put_transition | 维护条件转移 | object_id, expected_revision, expected_sha256, operation_key, transition | managed_write |
| remove_transition | 移除条件转移 | object_id, expected_revision, expected_sha256, operation_key, transition_id | managed_write |
| put_route | 维护固定路线 | object_id, expected_revision, expected_sha256, operation_key, route | managed_write |
| remove_route | 移除固定路线 | object_id, expected_revision, expected_sha256, operation_key, route_id | managed_write |
| put_playthrough | 维护固定试玩 | object_id, expected_revision, expected_sha256, operation_key, playthrough | managed_write |
| put_note | 维护固定意见 | object_id, expected_revision, expected_sha256, operation_key, note | managed_write |
| remove_note | 移除固定意见 | object_id, expected_revision, expected_sha256, operation_key, note_id | managed_write |
| target_digest | 读取目标固定摘要 | object_id, target_kind, target_id | read |
| check_quest | 检查专业关系与过期依据 | object_id | read |
| route_basis | 核对当前任务图依据 | object_id | read |
| simulate_route | 确定性执行固定路线 | object_id, route_id | read |
| analyze_reachability | 有界状态空间探索 | object_id, start_id, max_states | read |
| playthrough_view | 回读固定试玩快照 | object_id, playthrough_id | read |
| export_graph | 导出可读任务状态图 | object_id | read |
| record_playthrough | 固定完整试玩轨迹 | object_id, expected_revision, expected_sha256, operation_key, route_id, record_id, title | managed_write |
| export_reading | 导出专业阅读本 | object_id | read |
| export_review | 导出完整审核本 | object_id | read |
