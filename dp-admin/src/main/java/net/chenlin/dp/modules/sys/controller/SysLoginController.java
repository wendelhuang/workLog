package net.chenlin.dp.modules.sys.controller;

import java.awt.image.BufferedImage;
import java.io.IOException;

import javax.imageio.ImageIO;
import javax.servlet.ServletException;
import javax.servlet.ServletOutputStream;
import javax.servlet.http.HttpServletResponse;

import net.chenlin.dp.common.util.ShiroUtils;
import net.chenlin.dp.common.utils.Md5Utils;
import org.apache.shiro.authc.AuthenticationException;
import org.apache.shiro.authc.IncorrectCredentialsException;
import org.apache.shiro.authc.LockedAccountException;
import org.apache.shiro.authc.UnknownAccountException;
import org.apache.shiro.authc.UsernamePasswordToken;
import org.apache.shiro.subject.Subject;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.ResponseBody;

import com.google.code.kaptcha.Constants;
import com.google.code.kaptcha.Producer;

import net.chenlin.dp.common.entity.R;

/**
 * 用户controller
 * @author zcl<yczclcn@163.com>
 */
@Controller
@RequestMapping("/sys")
public class SysLoginController {
	
	@Autowired
	private Producer producer;
	
	/**
	 * 验证码
	 * @param response
	 * @throws ServletException
	 * @throws IOException
	 */
	@RequestMapping("/captcha.jpg")
	public void captcha(HttpServletResponse response)throws ServletException, IOException {
        response.setHeader("Cache-Control", "no-store, no-cache");
        response.setContentType("image/jpeg");

        //生成文字验证码
        String text = producer.createText();
        //生成图片验证码
        BufferedImage image = producer.createImage(text);
        //保存到shiro session
        ShiroUtils.setSessionAttribute(Constants.KAPTCHA_SESSION_KEY, text);
        
        ServletOutputStream out = response.getOutputStream();
        ImageIO.write(image, "jpg", out);
	}
	
	/**
	 * 登录
	 */
	@ResponseBody
	@RequestMapping(value = "/login", method = RequestMethod.POST)
	public R login(String username, String password, String captcha)throws IOException {
		String kaptcha = ShiroUtils.getKaptcha(Constants.KAPTCHA_SESSION_KEY);
		if(!captcha.equalsIgnoreCase(kaptcha)){
			return R.error("验证码不正确");
		}
		
		try{
			Subject subject = ShiroUtils.getSubject();
			//sha256加密
			password = Md5Utils.encrypt(username, password);
			UsernamePasswordToken token = new UsernamePasswordToken(username, password);
			subject.login(token);
		}catch (UnknownAccountException | IncorrectCredentialsException | LockedAccountException e) {
			return R.error(e.getMessage());
		} catch (AuthenticationException e) {
			return R.error("账户验证失败");
		}
	    
		return R.ok();
	}
	
	/**
	 * 退出系统
	 */
	@RequestMapping(value = "/logout", method = RequestMethod.GET)
	public String logout() {
		ShiroUtils.logout();
		return "redirect:login.html";
	}
	
}
