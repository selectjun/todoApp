package com.selectjun.todo.mapper;

import com.selectjun.todo.domain.UserEntity;
import org.apache.ibatis.annotations.Mapper;
import org.apache.ibatis.annotations.Param;

@Mapper
public interface UserMapper {

    /**
     * 회원 정보 저장
     * @param userEntity    회원 정보
     */
    public void save(UserEntity userEntity);

    /**
     * 회원 명수 by id
     * @param id    회원 구별 정보(아이디)
     * @return      회원 명수
     */
    public Long countById(@Param("id") String id);

}
