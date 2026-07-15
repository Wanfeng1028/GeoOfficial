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
  description: string;
  /** 该步骤对应的产品状态描述（用于截图画面的局部变化） */
  stateDescription: string;
}

export const workflowSteps: WorkflowStep[] = [
  {
    id: 'define',
    label: 'Define',
    number: '1.0',
    title: '定义研究对象、范围和目标。',
    description:
      '创建 Project，填写研究问题、区域边界、数据来源和交付标准。设定项目成员和权限。',
    stateDescription: '项目配置面板，包含研究问题、区域选择和元数据字段。',
  },
  {
    id: 'organize',
    label: 'Organize',
    number: '2.0',
    title: '组织数据、文件、工具和上下文。',
    description:
      '导入影像、矢量、代码、文献，建立可复用的目录结构。配置工具链和 Skills 环境。',
    stateDescription: '数据导入和目录管理界面，显示文件树、数据预览和元数据。',
  },
  {
    id: 'analyze',
    label: 'Analyze',
    number: '3.0',
    title: '在地图、代码、终端之间推进分析。',
    description:
      '在 Map 模式下查看图层和空间关系，在 Code 模式下编写和运行 Python 脚本，在 Work 模式下管理任务和工具。',
    stateDescription: '地图、代码编辑器和终端并排显示，展示活跃的分析工作流。',
  },
  {
    id: 'verify',
    label: 'Verify',
    number: '4.0',
    title: '复核输入、过程和输出。',
    description:
      '检查数据来源、参数设置、运行日志和中间结果。确认精度、覆盖范围和统计指标。',
    stateDescription: '验证面板，显示运行记录、日志、参数和结果对比。',
  },
  {
    id: 'deliver',
    label: 'Deliver',
    number: '5.0',
    title: '得到地图、数据、代码和报告。',
    description:
      '导出最终成果：制图、数据集、可复用工作流和完整报告。保留过程记录以便追溯。',
    stateDescription: '输出面板，包含导出选项、格式选择、版本标注和预览。',
  },
];