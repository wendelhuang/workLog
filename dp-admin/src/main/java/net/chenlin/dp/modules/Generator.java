package net.chenlin.dp.modules;

import net.chenlin.dp.common.support.gen.JdbcGenUtils;

/**
 * 代码生成器
 * 
 * @author zcl<yczclcn@163.com>
 */
public class Generator {

	public static void main(String[] args) throws Exception {
		String jdbcDriver = "com.mysql.jdbc.Driver";
		String jdbcUrl = "jdbc:mysql://118.89.219.190:3306/dp_pro?useUnicode=true&characterEncoding=utf-8";
		String jdbcUsername = "root";
		String jdbcPassword = "Huangww@211";

		String tablePrefix = "CBS_T_CALEN_DAT";

		String javaProject = "dp-admin";
		String javaModule = "cbs";
		String webModule = "cbs";

		JdbcGenUtils.generatorCode(jdbcDriver, jdbcUrl, jdbcUsername, jdbcPassword, tablePrefix, javaProject,
				javaModule, webModule);
	}

}
