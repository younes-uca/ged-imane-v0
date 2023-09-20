package ma.sir.ged.zynerator.security.common;

public interface SecurityParams {
    public static final String JWT_HEADER_NAME="Authorization";
    public static final String SECRET="5dd9c5d8-308c-490e-b010-40125ff223ba";
    public static final long EXPIRATION=86400000;
    public static final String HEADER_PREFIX="Bearer ";
}
