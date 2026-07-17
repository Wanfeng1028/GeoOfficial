/**
 * Workflow Steps — GeoWork 连续工作流
 *
 * 桌面端：
 * - 左侧步骤列表
 * - 右侧 Sticky 产品媒体
 * - 滚动切换局部状态
 *
 * 移动端：
 * - 取消 Sticky
 * - 变成顺序内容
 */
export interface WorkflowStep {
  id: string;
  label: string;
  number: string;
  title: string;
  enTitle: string;
  description: string;
  enDescription: string;
  /** 该步骤对应的产品状态描述（用于截图画面的局部变化） */
  stateDescription: string;
  enStateDescription: string;
}

export const workflowSteps: WorkflowStep[] = [
  {
    id: 'define',
    label: 'Define',
    number: '1.0',
    title: '定义研究对象、范围和目标。',
    enTitle: 'Define the research subject, scope, and goals.',
    description:
      '创建 Project，填写研究问题、区域边界、数据来源和交付标准。设定项目成员和权限。',
    enDescription:
      'Create a Project. Fill in the research question, area boundary, data sources, and delivery criteria. Set members and permissions.',
    stateDescription: '项目配置面板，包含研究问题、区域选择和元数据字段。',
    enStateDescription: 'Project config panel with research question, area selection, and metadata fields.',
  },
  {
    id: 'organize',
    label: 'Organize',
    number: '2.0',
    title: '组织数据、文件、工具和上下文。',
    enTitle: 'Organize data, files, tools, and context.',
    description:
      '导入影像、矢量、代码、文献，建立可复用的目录结构。配置工具链和 Skills 环境。',
    enDescription:
      'Import imagery, vectors, code, and literature. Build a reusable directory structure. Configure the toolchain and Skills environment.',
    stateDescription: '数据导入和目录管理界面，显示文件树、数据预览和元数据。',
    enStateDescription: 'Data import and directory management UI — file tree, data preview, and metadata.',
  },
  {
    id: 'analyze',
    label: 'Analyze',
    number: '3.0',
    title: '在地图、代码、终端之间推进分析。',
    enTitle: 'Move analysis across map, code, and terminal.',
    description:
      '在 Map 模式下查看图层和空间关系，在 Code 模式下编写和运行 Python 脚本，在 Work 模式下管理任务和工具。',
    enDescription:
      'In Map mode, inspect layers and spatial relationships. In Code mode, write and run Python scripts. In Work mode, manage tasks and tools.',
    stateDescription: '地图、代码编辑器和终端并排显示，展示活跃的分析工作流。',
    enStateDescription: 'Map, code editor, and terminal side-by-side — showing an active analysis workflow.',
  },
  {
    id: 'verify',
    label: 'Verify',
    number: '4.0',
    title: '复核输入、过程和输出。',
    enTitle: 'Review inputs, process, and outputs.',
    description:
      '检查数据来源、参数设置、运行日志和中间结果。确认精度、覆盖范围和统计指标。',
    enDescription:
      'Inspect data sources, parameter settings, run logs, and intermediate results. Confirm accuracy, coverage, and statistical metrics.',
    stateDescription: '验证面板，显示运行记录、日志、参数和结果对比。',
    enStateDescription: 'Verification panel — run records, logs, parameters, and result comparison.',
  },
  {
    id: 'deliver',
    label: 'Deliver',
    number: '5.0',
    title: '得到地图、数据、代码和报告。',
    enTitle: 'Get maps, data, code, and reports.',
    description:
      '导出最终成果：制图、数据集、可复用工作流和完整报告。保留过程记录以便追溯。',
    enDescription:
      'Export the final outputs: cartography, datasets, reusable workflows, and a full report. Process records are kept for traceability.',
    stateDescription: '输出面板，包含导出选项、格式选择、版本标注和预览。',
    enStateDescription: 'Output panel — export options, format choices, version tags, and preview.',
  },
];
